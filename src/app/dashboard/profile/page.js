"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Camera, Save, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setAvatarUrl(session.user.avatar || "");
    }
  }, [session]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ text: "Please upload an image file", type: "error" });
      return;
    }

    setIsUploading(true);
    setMessage({ text: "", type: "" });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setAvatarUrl(data.url);
        setMessage({ text: "Avatar uploaded temporarily. Remember to save!", type: "success" });
      } else {
        setMessage({ text: data.message || "Failed to upload image", type: "error" });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({ text: "An error occurred during upload", type: "error" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage({ text: "Name cannot be empty", type: "error" });
      return;
    }

    setIsSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, avatar: avatarUrl }),
      });

      const data = await res.json();

      if (res.ok) {
        
        await update({ name, avatar: avatarUrl });
        setMessage({ text: "Profile updated successfully!", type: "success" });
      } else {
        setMessage({ text: data.message || "Failed to update profile", type: "error" });
      }
    } catch (error) {
      console.error("Save profile error:", error);
      setMessage({ text: "An error occurred while saving", type: "error" });
    } finally {
      setIsSaving(false);
     
      setTimeout(() => {
        setMessage((prev) => prev.type === "success" ? { text: "", type: "" } : prev);
      }, 3000);
    }
  };

  if (!session) return null;

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted">Manage your personal information and avatar.</p>
      </div>

      <Card className="glass-card border-none shadow-sm">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSaveProfile} className="space-y-8">
            
           
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-border/50">
              <div className="relative group shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center border-4 border-background shadow-md">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-primary-500" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="text-center sm:text-left space-y-2 mt-2 sm:mt-4">
                <h3 className="font-semibold text-lg">Profile Picture</h3>
                <p className="text-sm text-muted max-w-sm">
                  Upload a high-res picture. It will be displayed on your stories and dashboard.
                </p>
              </div>
            </div>

          
            <div className="space-y-6 pb-8 border-b border-border/50">
              <h3 className="font-semibold text-lg">Personal Information</h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Display Name</label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="max-w-md"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                  <Input
                    id="email"
                    value={email}
                    disabled
                    className="max-w-md bg-surface/50 text-muted cursor-not-allowed"
                  />
                  <p className="text-xs text-muted">Your email address is used for login and cannot be changed here.</p>
                </div>
              </div>
            </div>

       
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-auto">
                {message.text && (
                  <p className={`text-sm font-medium px-4 py-2 rounded-lg ${message.type === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                    {message.text}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={isSaving} className="w-full sm:w-auto min-w-[140px]">
                {isSaving ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" /> Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" /> Save Profile
                  </>
                )}
              </Button>
            </div>
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

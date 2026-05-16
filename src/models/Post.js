import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [150, 'Title cannot be more than 150 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    excerpt: {
      type: String,
      maxlength: [300, 'Excerpt cannot be more than 300 characters'],
    },
    featuredImage: {
      url: { type: String, default: '' },
      public_id: { type: String, default: '' },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    categories: [
      {
        type: String,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isPublished: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true, 
    },
  },
  { timestamps: true }
);

PostSchema.pre('save', async function () {
  if (!this.excerpt && this.content) {
    const strippedContent = this.content.replace(/(<([^>]+)>)/gi, '');
    this.excerpt = strippedContent.substring(0, 150) + '...';
  }
});

if (process.env.NODE_ENV === 'development' && mongoose.models.Post) {
  delete mongoose.models.Post;
}
export default mongoose.models.Post || mongoose.model('Post', PostSchema);

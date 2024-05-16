import mongoose from 'mongoose';

export interface ICreateComments {
  postId: string;
  message: string;
}

export interface IDatabaComments extends ICreateComments {
  _id: mongoose.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

const commentsSchema = new mongoose.Schema<IDatabaComments>(
  {
    postId: {
      type: String,
      index: true,
      background: true,
      required: true
    },
    message: {
      type: String,
      required: true,
      maxlength: 2000
    }
  },
  {
    timestamps: true
  }
);

export const Comment = mongoose.model<IDatabaComments>('Comment', commentsSchema);

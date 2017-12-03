import { DbModel, CreatedAt } from './common.model';

export interface Article extends DbModel, CreatedAt {
    body: string;
    title: string;
    image: string;
    color: string;
    author: string;
    likeCount: number;
}

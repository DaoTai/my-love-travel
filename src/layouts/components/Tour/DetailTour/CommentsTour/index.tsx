import { useState } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { comments as FakeOtherComments, myComments as FakeMyComments, profile } from '~/data';
import MyComment from './MyComment';
import OtherComment from './OtherComment';
import { Comment } from '~/layouts/components/Tour/interface';
import style from '../styles.module.scss';
const cx = classNames.bind(style);
const CommentsTour = () => {
    const { id } = useParams();
    const [comments, setComments] = useState(FakeOtherComments.filter((comment) => comment.idTour === id));
    const [myComment, setMyComment] = useState<string>('');
    const [myComments, setMyComments] = useState<Comment[]>(FakeMyComments.filter((comment) => comment.idTour === id));
    const [showWrapButtons, setShowWrapButtons] = useState<boolean>(false);

    // Submit comment
    const handleSendComment = () => {
        if (myComment.trim()) {
            setMyComments((prev: any[]) => {
                const dataSend = {
                    ...profile,
                    idTour: id,
                    idAccount: Number(profile.id),
                    comment: myComment,
                    time: `${new Date().getDate()}  / ${new Date().getMonth() + 1} / ${new Date().getFullYear()}`,
                    id: Math.floor(Math.random() * 1000),
                };
                return [dataSend, ...prev];
            });
            setMyComment('');
            setShowWrapButtons(false);
        }
    };

    // Cancel comment
    const handleCancelComment = () => {
        setMyComment('');
        setShowWrapButtons(false);
    };

    return (
        <>
            <div id={cx('wrap-comments')}>
                <h3>Bình luận:</h3>
                <div className={cx('wrap-comments')}>
                    {/* My comment input */}
                    <div className={cx('my-comment')}>
                        <img srcSet={profile.avatar} alt="avatar" className={cx('avatar')} />
                        <div className={cx('wrap-input-comment')}>
                            <input
                                type="text"
                                placeholder="Nhập bình luận"
                                spellCheck={false}
                                autoComplete="off"
                                className={cx('input-comment')}
                                value={myComment}
                                onChange={(e) => setMyComment(e.target.value)}
                                onFocus={() => setShowWrapButtons(true)}
                            />
                            {showWrapButtons && (
                                <div className={cx('wrap-btns')}>
                                    <button className={cx('cancel-comment-btn')} onClick={handleCancelComment}>
                                        Huỷ
                                    </button>
                                    <button className={cx('send-comment-btn')} onClick={handleSendComment}>
                                        Bình luận
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* My comments */}
                    <div className={cx('wrap-other-comments')}>
                        {myComments.map((myComment: Partial<Comment>) => (
                            <MyComment key={myComment.id} myComment={myComment as Comment} myAccount={profile} />
                        ))}
                    </div>
                    {/* Other comments */}
                    <div id={cx('wrap-other-comments')}>
                        {comments.map((comment) => (
                            <OtherComment key={comment.id} comment={comment} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentsTour;

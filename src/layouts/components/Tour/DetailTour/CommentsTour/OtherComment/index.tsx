import { memo } from 'react';
import { Comment } from '~/layouts/components/Tour/interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './styles.module.scss';
const cx = classNames.bind(style);
function OtherComment({ comment }: { comment: Comment }) {
    return (
        <div key={comment.id} className={cx('other-comments')}>
            <img src={comment.avatar} alt="avatar" className={cx('avatar')} />
            <div className={cx('wrap-input-comment')}>
                <span>{comment.nameAccount}</span>
                <div className={cx('time-comment')}>
                    <FontAwesomeIcon icon={faClock} />
                    <span>{comment.time}</span>
                </div>
                <input readOnly type="text" value={comment.comment} className={cx('input-comment')} />
            </div>
        </div>
    );
}

export default memo(OtherComment);

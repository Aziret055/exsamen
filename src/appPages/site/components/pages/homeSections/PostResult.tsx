'use client';
import * as React from 'react';
import { useGetAllPostsQuery } from '@/redux/api/post';
import PostCard from '@/ui/postCard/PostCard';
import styles from './PostResult.module.scss';

const PostResult: React.FC = () => {
	const { data } = useGetAllPostsQuery();

	return (
		<div className={`container ${styles.container}`}>
			<div className={styles.results}>
				{data && data.map((post) => <PostCard key={post.id} postItem={post} />)}
			</div>
			{/* <aside className={styles.aside}></aside> */}
		</div>
	);
};
export default PostResult;

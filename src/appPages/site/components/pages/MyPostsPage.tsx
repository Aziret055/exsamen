'use client';

import MyPostResult from './myPostsSections/MyPostsResult';
import styles from './site.module.scss'
const MyPosts = () => {
	return (
		<main className={styles.home_main}>
			<MyPostResult />
		</main>
	);
};

export default MyPosts;

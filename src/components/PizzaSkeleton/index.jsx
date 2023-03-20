import ContentLoader from 'react-content-loader';

import styles from './PizzaSkeleton.module.scss';

export function PizzaSkeleton() {
  return (
    <div className={styles.skeleton}>
      <ContentLoader
        speed={1}
        width={300}
        height={458}
        viewBox="0 0 300 458"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <circle cx="150" cy="120" r="120" />
        <rect x="20" y="257" rx="9" ry="9" width="266" height="20" />
        <rect x="20" y="283" rx="9" ry="9" width="266" height="20" />
        <rect x="20" y="310" rx="9" ry="9" width="266" height="78" />
        <rect x="135" y="411" rx="25" ry="25" width="150" height="46" />
        <rect x="20" y="418" rx="7" ry="7" width="99" height="32" />
      </ContentLoader>
    </div>
  );
}

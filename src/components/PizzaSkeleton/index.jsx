import ContentLoader from 'react-content-loader';
export function PizzaSkeleton() {
  return (
    <ContentLoader
      speed={1}
      width={290}
      height={458}
      viewBox="0 0 290 458"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="130" cy="120" r="120" />
      <rect x="0" y="257" rx="9" ry="9" width="266" height="20" />
      <rect x="0" y="283" rx="9" ry="9" width="266" height="20" />
      <rect x="0" y="310" rx="9" ry="9" width="266" height="78" />
      <rect x="122" y="411" rx="25" ry="25" width="150" height="46" />
      <rect x="0" y="418" rx="7" ry="7" width="99" height="32" />
    </ContentLoader>
  );
}

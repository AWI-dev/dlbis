import { Link } from 'react-router-dom';

type BreadcrumbItem = {
  name: string;
  path?: string;
}

type BreadcrumbProps =  {
  items: BreadcrumbItem[];
  pageName: string; // Add the pageName prop
}

const Breadcrumb = ({ items, pageName }: BreadcrumbProps) => {
  return (
    // sm:flex-row sm:items-center sm:justify-between
    <div className="mb-6 flex flex-col gap-3 xl:flex-col justify-between ">
      <h1 className="text-2xl font-bold text-cta dark:text-white">
        {pageName}
      </h1>
      <nav>
        <ol className="flex items-center gap-2 text-sm">
          {items.map((item, index) => (
            <li key={index}>
              {item.path ? (
                <Link className='hover:opacity-60 hover:text-cta' to={item.path}>{item.name}</Link>
              ) : (
                <span className="text-customPrimary font-semibold">{item.name}</span>
              )}
              {index < items.length - 1 && ' / '}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;

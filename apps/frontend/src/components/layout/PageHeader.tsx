type PageHeaderProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

const PageHeader = ({ title, description, children }: PageHeaderProps) => {
  return (
    <div className="flex flex-row items-center mb-8">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && <h2 className="text-muted-foreground">{description}</h2>}
      </div>
      {children}
    </div>
  );
};

export default PageHeader;

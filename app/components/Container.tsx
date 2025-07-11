interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="max-w-[1700px] mx-auto xl:px-20 md:px-2 px-4">
      {children}
    </div>
  );
};
export default Container;

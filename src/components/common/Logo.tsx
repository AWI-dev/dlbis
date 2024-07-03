import Logo from '../../assets/Images/logo.png';

const Breadcrumb = () => {
  return (
    <>
      <div className="flex justify-center mt-4">
        <img className="w-24 flex justify-center" src={Logo} alt="Logo" />
      </div>
    </>
  );
};

export default Breadcrumb;

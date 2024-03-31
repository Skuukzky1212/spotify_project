interface Props {
  icon: React.FC<any>,
  label: string,
  width: number, 
  height: number,
}

const IconButton = ({icon: Icon, label: Label, width: Width, height: Height }: Props) => {
  return (
    <button className="flex items-center space-x-2 hover:text-white transition-colors duration-300">
      <Icon className={`h-${Height} w-${Width}`} />
      {/* <Icon className="w-5 h-5" /> */}
      <label className="block hover:cursor-pointer font-medium">{Label}</label>
    </button>
  );
};

export default IconButton;

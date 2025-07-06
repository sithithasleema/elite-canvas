import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  if (src) {
    return (
      <Image
        src={src}
        width={30}
        height={30}
        className="rounded-full"
        alt="User image"
      />
    );
  } else {
    return <FaUserCircle size={30} />;
  }
};

export default Avatar;

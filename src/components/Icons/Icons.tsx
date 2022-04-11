import { RiUserFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";

interface IconsProps {
  styleIcon?: any;
  onClick?: () => void;
}

export const IconUser = ({styleIcon, onClick}: IconsProps) => <RiUserFill style={styleIcon} onClick={onClick}/>
export const IconNotify = ({styleIcon, onClick}: IconsProps) => <IoIosNotifications style={styleIcon} onClick={onClick}/>
export const IconSearch = ({styleIcon, onClick}: IconsProps) => <AiOutlineSearch style={styleIcon} onClick={onClick}/>

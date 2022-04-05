import { RiUserFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";

interface IconsProps {
  styleIcon?: any;
} 
export const IconUser = ({styleIcon}: IconsProps) => <RiUserFill style={styleIcon}/>
export const IconNotify = ({styleIcon}: IconsProps) => <IoIosNotifications style={styleIcon} />
export const IconSearch = ({styleIcon}: IconsProps) => <AiOutlineSearch style={styleIcon} />

// import Button from "components/UI/buttons";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from '../../public/images/eng.png'

export default function Header(){
    const { data: session } = useSession()
    const { pathname } = useRouter()
    return (
        <Navbar className="py-5 shadow-md h-20">
            <Navbar.Brand as={Link} href="/">
                <Image src={logo.src} width={50} height={40} alt='logo'/>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <div className="w-[80px] h-[40px] flex justify-end">
                {session?.user.id 
                    ? 
                        <Dropdown arrowIcon={false} inline={true} label={<Avatar alt="User settings" img={session?.user.image} rounded={true} bordered={true} color="success"/>} >
                            <Dropdown.Header>
                                <span className="block text-sm">
                                    {session?.user.name}
                                </span>
                            </Dropdown.Header>
                            <Dropdown.Item>
                                <Link href='/user' className="w-full">Словарь</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Настройки
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={()=>{signOut()}}>
                                Выход
                            </Dropdown.Item>
                        </Dropdown>
                    : 
                        <Button className="h-[40px]" onClick={()=>signIn()}>Войти</Button>
                }
                </div>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse className="z-10 bg-white">
                <Navbar.Link as={Link} href="/groups" active={pathname === "/groups"} className="text-lg z-10">
                    Слова
                </Navbar.Link>
                <Navbar.Link disabled as={Link} href="/texts" active={pathname === "/texts"} className="text-lg">
                    Тексты
                </Navbar.Link>
                <Navbar.Link disabled as={Link} href="/grammars" active={pathname === "/grammars"} className="text-lg">
                    Грамматика
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}
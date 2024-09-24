import {Sidebar} from 'flowbite-react'
import{HiUser,HiArrowSmRight} from 'react-icons/hi'

const DashSidebar = () => {
  return (
    <Sidebar>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Sidebar.Item active icon={HiUser} label={"User"} labelColor='dark'>
                    Profile
                </Sidebar.Item>
                <Sidebar.Item active icon={HiArrowSmRight} label={"User"} labelColor='dark'>
                    Profile
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar
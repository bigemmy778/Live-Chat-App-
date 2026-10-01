import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatComponents from '../components/ChatComponents'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContext'
import { useState, useEffect } from 'react'


const HomePage = () => {
    // const [selectedUser, setSelectedUser] = useState(false)

    const { selectedUser } = useContext(ChatContext)
    // ...inside the component, alongside your other hooks:
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])


    return (
        <div className="border w-full h-screen sm:px-[15%] sm:py-[5%]">
            {/* <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl 
                overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]': 'md:grid-cols-2' }`}> */}
            <div
                className="backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative"
                style={{
                    gridTemplateColumns: isDesktop
                        ? (selectedUser ? '1fr 1.5fr 1fr' : '1fr 1fr')
                        : undefined
                }}
            >
                <Sidebar />
                <ChatComponents />
                <RightSidebar />
            </div>
        </div>
    )
}


export default HomePage
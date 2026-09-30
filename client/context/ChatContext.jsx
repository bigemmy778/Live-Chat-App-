// We import the React tools we need. //
// createContext → creates a place where we can store and share data 
// useContext → allows us to get data from another Context 
// useEffect → runs code when something changes 
// useState → creates and manages stateil
import { createContext, useContext, useEffect, useState } from "react";

// We get the AuthContext because our chat needs things 
// such as the logged-in user's socket connection and axios.
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";


// Create the ChatContext. 
// This is the "container" where we will share our chat data
// with other components in the application.
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const [messages, SetMessages] = useState([]);
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [unseenMessages, setUnseenMessages] = useState({})

    const { socket, axios } = useContext(AuthContext);


    //function to get all users for sidebar
    const getUsers = async () => {
        try {
            const { data } = await axios.get("/api/messages/users")
            if (data.success) {
                setUsers(data.users)
                setUnseenMessages(data.unseenMessages)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to get mesages for selected user
    const getMessages = async (userId) => {
        try {
            const { data } = await axios.get(`/api/messages/${userId}`)
            if (data.success) {
                SetMessages(data.messages)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to send message to selected user
    const sendMessage = async (messageData) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if (data.success) {
                SetMessages((prevMessages) => [...prevMessages, data.newMessage])
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    // function to subscribe to messages for selected user
    const subscribeToMessages = async () => {
        if (!socket) return;
        socket.on("newMessage", (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true;
                SetMessages((prevMessages) => [...prevMessages, newMessage])
                axios.put(`/api/messages/mark/${newMessage._id}`)
            } else {
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages, [newMessage.senderId]:
                        [prevUnseenMessages[newMessage.senderId]] ? prevUnseenMessages[newMessage.senderId] + 1 : 1
                }))
            }
        })
    }


    // function to unsubscribe from messages
    const unsubscribeFromMessages = () => {
        if (socket) socket.off("newMessage");
    }

    useEffect(() => {
        //whenever the SelectedUser changes then these function will be called
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [socket, selectedUser])


    const value = {
        messages, users, setUnseenMessages, selectedUser, getUsers, SetMessages, getMessages, sendMessage, setSelectedUser, unseenMessages
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}


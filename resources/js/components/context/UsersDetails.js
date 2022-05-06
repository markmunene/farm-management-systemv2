import axios from "axios";
import React, { useContext, useState, useEffect, useCallback, useRef } from "react";
import UseLocalStorage from "../UseLocalStorage";
import LocalStorage from "./LocalStorage";

const userContext = React.createContext();
export function useContacts() {
    return useContext(userContext);
}
export function UsersDetailsprovider({ children }) {
    const [contacts, setContacts] = useState([]);
    const [Farmercontacts, setFarmerContacts] = useState([]);
    const [Expertcontacts, setExpertContacts] = useState([]);
    const [BuyerContact, setBuyerContact] = useState([]);
    
    const [value, setValue, removeValue] = UseLocalStorage("LocalUser", []);
    
    const [fetching, setfetching] = useState(true);
    const [user, setUser] = useState([]);
    

    const filterSingleUserDetails = (id) =>
{
    return contacts.filter((items) => items.id === id);
}
    useEffect(() => {
        if (fetching) {
            const fetchAllusers = async () => {
                await axios
                    .get("/api/fetchUsers")
                    .then((res) =>
                    {
                          
                        setContacts(res.data);
                        setfetching(false);
                    })                 
                    .catch((err) => {})
            };
            fetchAllusers();         
            fetchUser();  
            setfetching(false)
        }
        return () =>
        {
         
            setfetching(false);
        };
    }, []);

    // fecthing authenticated user
    const fetchUser = async () =>
    {
       try {
           
            await axios
                .get("/api/user")
                .then((res) => {
                    setUser(res.data);
                    setValue(res.data);
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        removeValue();
                    }
                    console.log(error);
                });
       } catch (error) {
           console.log(error);
       }    
    };
    useEffect(() => {
        filterUsers();
       

        return () => {};
    }, [contacts]);

// filtering users according to their Roles
    const filterUsers = () =>
    {
          contacts.filter((items, i) => {
              if (items.User_Role == 1) {
                
               return  setFarmerContacts(prev =>[...prev, items.name])
              } else if (items.User_Role == 2) {
                 return setExpertContacts(prev=>[...prev,items.name]) 
              }
              else if (items.User_Role == 3) {
                  setBuyerContact((prev) => [...prev, items.name]);
              }
          });
      }
    // 
   const  setNewUser = () =>
    {
     return   fetchUser();
    } 
    const EmptyUser = () =>
    {
        removeValue();
      return  setUser([]);
    }
return (
        <userContext.Provider
            value={{
                value,
                Farmercontacts,
                Expertcontacts,
                BuyerContact,
                contacts,
                user,
                setNewUser,
                EmptyUser,
                filterSingleUserDetails,
            }}
        >
            {children}
        </userContext.Provider>
    );
}

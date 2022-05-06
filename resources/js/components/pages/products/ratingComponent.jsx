 
import {useState, useEffect} from 'react'
     
     export default function StarRating({ outOf, onChange, value,numberOfStars,editable ,Color }) {
         const [stars] = useState([]);
         const [rating, setrating] = useState(0);
         const [hovered, sethovered] = useState(0);
         const [deselectedIcon] = useState("☆");
         const [selectedIcon] = useState("★");

         useEffect(() => {
             let outOf = outOf ? outOf : numberOfStars;
        setrating(value,numberOfStars);
             for (var i = 0; i < outOf; i++) {
                 stars.push(i + 1);
             }
         }, []);

         const changeRating = (newRating) =>
         {
             onChange(newRating);
             setrating(newRating);
         };

         const hoverRating = (rating) => {
             sethovered(rating);
         };

         
         return (
             <div>
                 <div
                     className="rating"
                     style={{ fontSize: "5em", color: Color }}
                 >
                     {stars.map((star) => {
                         return (
                             <span
                                 style={{ cursor: "pointer" }}
                                 onClick={() => { editable ?  changeRating(star) : ""   
                                 }}
                                 onMouseEnter={() =>
                                 {
                                     editable ? hoverRating(star): ""
                                     
                                 }}
                                 onMouseLeave={() => {
                                     hoverRating(0);
                                 }}
                             >
                                 {rating < star
                                     ? hovered < star
                                         ? deselectedIcon
                                         : selectedIcon
                                     : selectedIcon}
                             </span>
                         );
                     })}
                 </div>
             </div>
         );
     }
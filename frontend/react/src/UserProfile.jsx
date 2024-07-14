// const UserProfile = (props) =>{
//     return (
//         <div>
//             <h1>{props.name}</h1>
//             <h1>{props.age}</h1>
//             <img src={`https://randomuser.me/api/portraits/${props.gender}/${props.num}.jpg`} alt="profile pic"/>
//         </div>
//     )
// }

const UserProfile = ({name, age, gender, num, role, ...props}) =>{
    gender = gender === "Male" ? "men" : "women";
    return (
        <div style={{display: 'flex', border: '2px solid yellow', width: '40vmin'}}>
            <img border={5} height={130} width={130} src={`/assets/${name}_2023.png`} alt="profile pic"/>
            <div style={{flexDirection:'column', margin:'auto'}}>
                <h3>Name : {name}</h3>
                <h4>Age : {age}</h4>
                <h4>Role : {role}</h4>
                {props.children}
            </div>
        </div>
    )
}

export default UserProfile;
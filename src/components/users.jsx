import React, {useState} from "react"
import api from "../api"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handlerDelete = (id) => {
        setUsers((prevState) => (prevState.filter((user) => user._id !== id)))
    };

    const renderCountUsers = () => {
        if (users.length === 0) return "Никто не будет тусить с тобой!";
        if (users.length >= 2 && users.length <= 4) return `${users.length} человека тусанет с тобой сегодня`;
        return `${users.length} человек тусанет с тобой сегодня`

    };

    const getColorCountUsers = () => {
        let classes = "badge m-1 ";
        classes += users.length !== 0 ? "bg-primary" : "bg-danger"
        return classes
    };

    const renderQuality = (qualities) => {
        const getQualityColor = (color) => {
            return `badge bg-${color} m-2`
        };
        return qualities.map((quality) => (
            <span key={quality._id} className={getQualityColor(quality.color)}>{quality.name}</span>
        ));
    };

    const renderUsersInfo = () => {
        return users.map((user) => (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>{renderQuality(user.qualities)}</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate} /5</td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={() => handlerDelete(user._id)}>delete
                    </button>
                </td>
            </tr>
        ))
    };

    return (<>
            <h1><span className={getColorCountUsers()}>{renderCountUsers()}</span></h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качество</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                </tr>
                </thead>
                <tbody>
                {renderUsersInfo()}
                </tbody>
            </table>
        </>
    )
}
export default Users;

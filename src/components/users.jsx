import React, {useState} from "react"
import api from "../api"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handlerDelete = (id) => {
        setUsers((prevState) => (prevState.filter((user) => user._id !== id)))
    };

    const getPersonPlural = (count) => {
        return (
            [2, 3, 4].includes(count % 10) &&
            ![12, 13, 14].includes(count % 100)
                ? 'человека' : 'человек'
        );
    }

    const prepareTitle = () => {
        const count = users.length;
        return count === 0
            ? "Никто не будет тусить с тобой!"
            : `${count} ${getPersonPlural(count)} тусанет с тобой сегодня`;
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
            <h1><span className={getColorCountUsers()}>{prepareTitle()}</span></h1>
            {users.length !== 0 && <table className="table">
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
            </table>}
        </>
    )
}
export default Users;

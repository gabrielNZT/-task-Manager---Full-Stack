import React from "react";

import Group from "../../elements/group";
import AddGroupButton from '../../elements/addGroupButton';
import DropButton from "../logout";
import '../logout/index.js'

const GroupList = (props) => {
    const { state: { groups }, dispatch } = props;

    const handleAdd = () => {
        dispatch({
            type: 'SHOW_MODAL', payload: {
                modal: 'CREATE_GROUP'
            }
        })
    }

    return <>
        {groups.map((group) => (<Group key={group.id} group={group} dispatch={dispatch} />))}
        <AddGroupButton onClick={handleAdd} />
        <div className="div-dropdown">
            <DropButton />
        </div>

    </>;
}

export default GroupList;
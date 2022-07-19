import Group from "../group";
import { Container } from "react-dom";
import styled from 'styled-components';

function Board() {

    return (
        <view style={{ display: 'flex'}}>
            <Group></Group>
            <Group></Group>
            <Group></Group>
            <Group></Group>
            <Group></Group>
        </view>

    );
}

export default Board;
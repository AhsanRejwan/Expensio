import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";

export const ModalContainer = (props) => {

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
        </Modal>
    )
}
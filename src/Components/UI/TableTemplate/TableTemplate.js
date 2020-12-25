import React from "react";
import {Table} from "react-bootstrap";
import classes from './TableTemplate.module.css'

export const TableTemplate = (props) => {
    const columns = props.columns;
    const rows = props.rows;
    const values = props.values;


    return (
        <Table striped bordered hover variant="dark" className={classes.TableTemplate}>
            <thead>
            <tr>
                <th>Date</th>
                {columns.map((colName, key) => <th key={key}>{colName}</th>)}
            </tr>
            </thead>
                <tbody >
                {values.map((rows, rowIndex) => {
                    return (
                        <tr key={rowIndex}>
                            <td>{rowIndex === ((values.length) - 1) ? 'Current Balance ' : rowIndex + 1}</td>
                            {values[rowIndex].map((cell, colIndex) => {
                                    let val = values[rowIndex][colIndex], color = '';

                                    if (val > 0) {
                                        color = classes.Add;
                                    } else if (val < 0) {
                                        color = classes.Subtract;
                                    } else {
                                        color = classes.Neutral;
                                    }

                                    return <td key={colIndex} className={color}>{val > 0 && (rowIndex!==values.length-1) ? '+' + val : val}</td>
                                }
                            )}
                        </tr>
                    );
                })}
                </tbody>
        </Table>
    )

}
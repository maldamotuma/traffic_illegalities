import React, { useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import { useDispatch } from "react-redux";
import * as ruleactions from "../../redux/actions/rulesaction";
import { bindActionCreators } from 'redux';

const Rules = (props) => {
    const { title, data, deleteRule } = props;

    const columns = [
        {
            name: "article",
            label: "Article",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "title",
            label: "Title",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "description",
            label: "Description",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "frqnt",
            label: "Frequent",
            options: {
                filter: false,
                sort: true,
            }
        }
    ];

    const options = {
        filterType: 'checkbox',
    };

    return (
        <MUIDataTable
            title={title}
            data={data}
            columns={columns}
            options={options}
            options={{
                onRowsDelete: deleteRule
            }}
        />
    )
}

export default Rules;
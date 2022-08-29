import React, { Component } from 'react';
import _ , {map} from 'lodash';
class TableBody extends Component {
    renderCell = (item,column) => {
        if(column.content) return column.content(item);

        return _.get(item,column.path);
    }
    getKey = (item,column) => {
        return item._id + (column.path || column.key)
    };
    render() { 
        const{ data,columns } = this.props;
        return <tbody>
        {data.map(item => <tr key={item._id}>
            {columns.map(column => <td key={this.getKey(item,column)} >{this.renderCell(item,column)}</td>)}
        </tr> )}
        </tbody>;
    }
}
export default TableBody;    
    //        <td>
    //         <Like liked={movie.liked} onClick={() => onLike(movie)}/>
    //        </td>
    //        <td>
    //         <button onClick={() => onDelete(movie)} className='btn btn-danger btn-sm'>Delete</button>
    //         </td>
    //    </tr>
    
 

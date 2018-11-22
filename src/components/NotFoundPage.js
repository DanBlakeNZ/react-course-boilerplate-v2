import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


export const NotFoundPage = ()=> (
    <div>
       404! - <Link to='/'>Go Home</Link>
    </div>
);

export default NotFoundPage;
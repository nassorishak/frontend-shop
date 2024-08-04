import React from 'react'
import Header from './Header'
import links from '../navigation/Links'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const role = localStorage.getItem('storedRole');
const Navigation = ({useRole = role}) => {

  if (!links[role]) {
    console.error(`Role ${role} does not exist in links object`);
    return <div>Error: Role not found</div>;
  }

  return (
    <><Header />
    <div className="sidebar">
          <ul className="list">
            {links[useRole].map((link , index)=>(
              <li key={index} className="list-item">
                <NavLink to={link.path}>
                <FontAwesomeIcon icon={link.icon} />
                <span>{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
      </div>
    </>
  )
}

export default Navigation

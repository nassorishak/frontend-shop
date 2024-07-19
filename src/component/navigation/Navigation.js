import React from 'react'
import Header from './Header'
import links from '../navigation/Links'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navigation = ({useRole = 'Customer'}) => {
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

import React from 'react'
import Navigation from '../navigation/Navigation'

const PaymentRecord = () => {
  return (
    <><Navigation />
    <div className='main'>

        <p>VENDOR PAYMENT RECORD</p>
        <table>
    
<h2>View Product</h2>
<hr/>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
    <th>Country</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>Alfreds Futterkiste</td>
    <td>Alfreds Futterkiste</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
    <td>Alfreds Futterkiste</td>
    <td>Alfreds Futterkiste</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
    <td>Alfreds Futterkiste</td>
    <td>Alfreds Futterkiste</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
    <td>Alfreds Futterkiste</td>
    <td>Alfreds Futterkiste</td>
  </tr>
 
</table>


      </div></>
  )
}

export default PaymentRecord

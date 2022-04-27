import React, { useEffect } from 'react';
import TableDisplay from '../components/display/TableDisplay';
import * as carActionCreators from "../redux/actions/carActions";
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

function createData(name, type, plate, community, owner) {
  return { name, type, plate, community, owner };
}

const CarList = () => {

  const dispatch = useDispatch();
  const { fetch_cars } = bindActionCreators(carActionCreators, dispatch);
  const { cars } = useSelector(state => state.newCar);

  useEffect(() => {
    fetch_cars();
  }, []);

  const generateColumn = () => {
    let columns = [];
    cars?.forEach(car => {
      columns.push( createData(car.name, car.type, car.platenumber, car.level.community, car.owner));
    });
    return columns;
  }

  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'type', label: 'Type', minWidth: 100 },
    {
      id: 'platenumber',
      label: 'plate',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'level.community',
      label: 'Community',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'owner',
      label: 'Owner',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];
  return (
    <TableDisplay
      title={"Cars List"}
      columns={columns}
      rows={cars ?? []}
    />
  )
}

export default CarList
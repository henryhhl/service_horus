
import React from 'react';
import PropTypes from "prop-types";

import { Table } from 'antd';
import { Resizable } from 'react-resizable';


const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export default class C_Table extends React.Component {
  state = {
    columns: this.props.columns,
  };

  components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  handleResize = index => (e, { size }) => {
    this.setState( ( { columns } ) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    } );
  };

  render() {
    const columns = this.state.columns.map( (col, index) => ( {
      ...col,
      onHeaderCell: column => ({ 
        width: column.width,
        onResize: this.handleResize(index),
      } ),
    } ) );
    return (
      <Table 
        pagination={false} bordered size={"small"}
        style={{ width: "100%", minWidth: "100%", maxWidth: "100%", }}
        components={this.components} columns={columns} dataSource={this.props.dataSource}
        scroll={this.props.scroll}
      />
    );
  }
}

C_Table.propTypes = {
  columns:    PropTypes.array,
  dataSource: PropTypes.array,
  scroll:     PropTypes.object,
};

C_Table.defaultProps = {
  columns:    [],
  dataSource: [],
};

import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from "aphrodite";

const CourseListRow = ({ isHeader, textFirstCell, textSecondCell}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChecked = () => {
    setIsChecked(!isChecked);
  }

  const rowStyles = isChecked ? styles.rowCheckedStyle : styles.rowStyle;

  return (
    <tr className={ isHeader ? css(styles.headerStyle) : css(rowStyles) }>
    {isHeader ? (
          textSecondCell === null ? (
            <th colSpan={2}>{ textFirstCell }</th>)
            :
            (
              <>
                <th className={ css(styles.leftAlign) } >{ textFirstCell }</th>
                <th className={ css(styles.rightAlign) } >{ textSecondCell }</th>
              </>
            )
          )
        :
        (
          <>
            <td className={ css(styles.leftAlign) } >
              {textFirstCell && (
                <input
                  type="checkbox"
                  checked={ isChecked }
                  onChange={ handleOnChecked }>
                </input>
              )}
              { textFirstCell }
            </td>
            <td className={ css(styles.rightAlign) }>{ textSecondCell }</td>
          </>
        )
      }
    </tr>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#deb5b545",
  },

  rowStyle: {
    backgroundColor: "#f5f5f5ab",
  },

  rowCheckedStyle: {
    backgroundColor: "#e6e4e4",
  },

  leftAlign: {
    textAlign: "left",
    paddingLeft: "20x",
  },

  rightAlign: {
    textAlign: "right",
    paddingRight: "20px",
  },
});

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
}

export default CourseListRow;

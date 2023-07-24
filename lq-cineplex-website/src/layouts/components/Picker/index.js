import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import classNames from 'classnames';
const cx = classNames;
export default function HelperText() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker className={cx('w-96')} />
        </LocalizationProvider>
    );
}

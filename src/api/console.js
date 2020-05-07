import request from '@/plugins/request';

export function GetSupList (data = {}) {
    return request({
        url: '/compareRes',
        method: 'post',
        data
    });
}
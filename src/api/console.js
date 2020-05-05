import request from '@/plugins/request';

export function GetSupList (data = {}) {
    return request({
        url: '/admin/get/supList',
        method: 'post',
        data
    });
}
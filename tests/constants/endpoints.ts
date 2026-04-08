export const endpoints = {
    login: '/login',
    logout: '/logout',

    patients: '/patients',
    patientById: (patientId: number | string) => `/patients/${patientId}`,

    patientNotes: (patientId: number | string) => `/patients/${patientId}/notes`,
    patientOrders: (patientId: number | string) => `/patients/${patientId}/orders`,
    patientScans: (patientId: number | string) => `/patients/${patientId}/scans`,

    scanById: (patientId: number | string, scanId: number | string) =>
        `/patients/${patientId}/scans/${scanId}`,

    scanComment: (patientId: number | string, scanId: number | string) =>
        `/patients/${patientId}/scans/${scanId}/comments`,

    scanUploadJson: (patientId: number | string) =>
        `/patients/${patientId}/scans/upload-json`,
};
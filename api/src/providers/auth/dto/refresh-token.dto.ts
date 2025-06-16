import * as yup from 'yup';

export const RefreshTokenSchema = yup.object({
  refreshToken: yup.string().required('Refresh token é obrigatório'),
});

export class RefreshTokenDto {
  refreshToken: string;
}

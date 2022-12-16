/**
 * 여러 곳에서 공유하여 사용할만한 swagger 문서용 함수 및 데이터 모음
 */
import { ApiResponseOptions } from '@nestjs/swagger';

export const response400Docs: ApiResponseOptions = {
  description: `Bad Request
- Request parameter 가 잘못됨
- Request Body 가 잘못됨
`,
};
export const response401Docs: ApiResponseOptions = {
  description: `Unauthorized
- Access Token 이 헤더나 쿠키에 없음
- Access Token 이 만료됨
- 인증 정보가 잘못됨`,
};

export const response403Docs: ApiResponseOptions = {
  description: `Forbidden
- 해당 사용자가 API 를 실행할 권한이 없음`,
};

export const response404Docs: ApiResponseOptions = {
  description: `Not Found
- 해당 리소스가 없음
- 해당 리소스에 대해 접근할 권한이 없음`,
};

export const response422Docs: ApiResponseOptions = {
  description: `Unprocessable Entity`,
};

/**
 * Swagger ApiResponse 의 type 에 이 함수로 Response 타입을 감싸서 넣는다. namespace 를 벗어나면 이름이 겹쳐서 제대로 스키마가 표시되지 않기 때문.
 * @param originalResponseClass namespace 안에 있는 `ResponsePayload` class
 * @param responseTypeName Swagger 에 표시하고싶은 해당 응답 객체의 이름.
 * @returns
 */
export function responseTypeClassWrapper(
  originalResponseClass: any,
  responseTypeName: string,
) {
  const ClassToWrap = class extends originalResponseClass {};

  Object.defineProperty(ClassToWrap, 'name', { value: responseTypeName });

  return ClassToWrap;
}

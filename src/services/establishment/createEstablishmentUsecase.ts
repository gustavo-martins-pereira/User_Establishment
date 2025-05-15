import { CreateEstablishmentRequestDTO } from "@models/establishment/request/establishmentRequestDTO.ts";
import { USER_TYPE } from "@models/user/user.ts";
import { createEstablishment } from "@repositories/establishmentRepository.ts";
import { getUserById } from "@repositories/userRepository.ts";
import { BadRequestError } from "@utils/errors/AppError.ts";

async function createEstablishmentUsecase(establishmentData: CreateEstablishmentRequestDTO) {
    const user = await getUserById(establishmentData.ownerId);
    if(user?.type !== USER_TYPE.OWNER) throw new BadRequestError("The user must be a owner to create a establishment");

    return await createEstablishment(establishmentData);
}

export {
    createEstablishmentUsecase,
};

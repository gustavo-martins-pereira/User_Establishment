import { GetAllUsersResponseDTO } from "@models/user/response/userResponseDTO.ts";
import { getAllUsers } from "@repositories/userRepository.ts";

async function getAllUsersUsecase(): Promise<GetAllUsersResponseDTO> {
    return await getAllUsers();
}

export {
    getAllUsersUsecase,
}; 
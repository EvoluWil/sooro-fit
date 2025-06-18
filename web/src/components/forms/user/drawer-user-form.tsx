import { DrawerBase } from '@/components/atoms/drawer-base';
import { InputText } from '@/components/molecules/input-text';
import { Select } from '@/components/molecules/select';
import { User, userRoleOptions } from '@/types/user.type';
import { Button } from '@chakra-ui/react';
import { useUserForm } from './hook-user-form';

export type DrawerUserFormProps = {
  user?: User | null;
  onClose: () => void;
};

export const DrawerUserForm: React.FC<DrawerUserFormProps> = (props) => {
  const { control, onSubmit, isEditing, open, handleClose, onToggle } =
    useUserForm(props);
  return (
    <>
      <Button onClick={onToggle} p={4}>
        {isEditing ? 'Editar Usuário' : 'Adicionar Usuário'}
      </Button>
      <DrawerBase
        title={isEditing ? 'Editar Usuário' : 'Adicionar Usuário'}
        subtitle={
          isEditing
            ? 'Atualize os dados do usuário'
            : 'Preencha os dados do usuário'
        }
        body={
          <>
            <Select
              name="role"
              control={control}
              label="Nível de Acesso"
              placeholder="selecione o nível de acesso"
              options={userRoleOptions}
            />

            <InputText
              name="name"
              control={control}
              label="Nome"
              placeholder="Digite o nome"
            />

            {!isEditing && (
              <>
                <InputText
                  name="username"
                  control={control}
                  label="Usuário"
                  placeholder="Digite o nome de usuário"
                />

                <InputText
                  name="password"
                  type="password"
                  control={control}
                  label="Senha"
                  placeholder="Digite a senha do usuário"
                />

                <InputText
                  name="passwordConfirmation"
                  type="password"
                  control={control}
                  label="Confirmar Senha"
                  placeholder="Confirme a senha do usuário"
                />
              </>
            )}
          </>
        }
        footer={
          <>
            <Button variant="outline" p={4} onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={onSubmit} p={4}>
              {isEditing ? 'Atualizar Usuário' : 'Criar Usuário'}
            </Button>
          </>
        }
        isOpen={open}
        onClose={handleClose}
      />
    </>
  );
};

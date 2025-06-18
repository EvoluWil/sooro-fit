import { DrawerBase } from '@/components/atoms/drawer-base';
import { InputText } from '@/components/molecules/input-text';
import { User } from '@/types/user.type';
import { Button } from '@chakra-ui/react';
import { useStudentForm } from './hook-student-form';

export type DrawerStudentFormProps = {
  student?: User;
};

export const DrawerStudentForm: React.FC<DrawerStudentFormProps> = (props) => {
  const { control, onSubmit, isEditing, open, handleClose, onToggle } =
    useStudentForm(props);
  return (
    <>
      <Button onClick={onToggle} p={4}>
        {isEditing ? 'Editar Aluno' : 'Adicionar Aluno'}
      </Button>
      <DrawerBase
        title={isEditing ? 'Editar Aluno' : 'Adicionar Aluno'}
        subtitle={
          isEditing
            ? 'Atualize os dados do aluno'
            : 'Preencha os dados do aluno'
        }
        body={
          <>
            <InputText
              name="name"
              control={control}
              label="Nome do Aluno"
              placeholder="Digite o nome do aluno"
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
                  placeholder="Digite a senha do aluno"
                />

                <InputText
                  name="passwordConfirmation"
                  type="password"
                  control={control}
                  label="Confirmar Senha"
                  placeholder="Confirme a senha do aluno"
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
              {isEditing ? 'Atualizar Aluno' : 'Criar Aluno'}
            </Button>
          </>
        }
        isOpen={open}
        onClose={handleClose}
      />
    </>
  );
};

import { useState } from "react";
import { fetchMascot, Mascot } from "../../../services/mascotService";
import {
  CloseModalButton,
  FavoriteModalButton,
  MascotContent,
  MascotDescriptionContainer,
  ModalButtons,
  ModalContent,
  ModalContentDescription,
  ModalContentInfo,
  ModalContentWrapper,
  ModalOverlay,
} from "./MascotModal.styles";
import { useQuery } from "@tanstack/react-query";
import { SpinnerGap } from "phosphor-react";

interface MascotModalProps {
  isOpen: boolean;
  onClose: () => void;
  mascot: Mascot | null;
}

export function MascotModal({ isOpen, onClose, mascot }: MascotModalProps) {
  if (!isOpen || !mascot) return null;

  return (
    <>
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalContentWrapper>
            <ModalContentInfo>
              <img src={mascot.Imagem} alt={mascot.Aparência} />
              <span>{mascot.Nome}</span>
            </ModalContentInfo>
            <ModalContentDescription>
              <MascotDescriptionContainer>
                <h1>{mascot.Titulo}</h1>
                <h2>{mascot.Descrição}</h2>
                <h3>Personalidade</h3>
                <span>{mascot.Personalidade}</span>
                <h3>Habilidade especial</h3>
                <span>{mascot.Habilidade_Especial}</span>

                <ModalButtons>
                  <FavoriteModalButton>
                    Remover dos favoritos
                  </FavoriteModalButton>
                  <CloseModalButton onClick={onClose}>Fechar</CloseModalButton>
                </ModalButtons>
              </MascotDescriptionContainer>
            </ModalContentDescription>
          </ModalContentWrapper>
        </ModalContent>
      </ModalOverlay>
    </>
  );
}

interface MascotListProps {
  mascots: Mascot[];
}

function MascotList({ mascots }: MascotListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMascot, setSelectedMascot] = useState<Mascot | null>(null);

  const openMascotModal = (mascot: Mascot) => {
    setSelectedMascot(mascot);
    setIsModalOpen(true);
  };

  const closeMascotModal = () => {
    setSelectedMascot(null);
    setIsModalOpen(false);
  };


  const filteredMascots = mascots
    .filter(mascot => mascot.Status === "Conquistado")
    .slice(0, 12);

  return (
    <>
      <MascotContent>
        {filteredMascots.map((mascot) => (
          <div key={mascot.id}>
            <img
              src={mascot.Imagem}
              alt={mascot.Nome}
              onClick={() => openMascotModal(mascot)}
            />
          </div>
        ))}
      </MascotContent>
      <MascotModal
        isOpen={isModalOpen}
        onClose={closeMascotModal}
        mascot={selectedMascot}
      />
    </>
  );
}

export function MascotPage() {
  const { data: mascots, isLoading, isError, error } = useQuery<Mascot[], Error>({
    queryKey: ['mascots'],
    queryFn: fetchMascot,
  });

  if (isLoading) return <p><SpinnerGap size={32} /></p>;
  if (isError) return <p>Erro: {error?.message || 'Erro ao carregar mascotes'}</p>;

  return <MascotList mascots={mascots || []} />;
}

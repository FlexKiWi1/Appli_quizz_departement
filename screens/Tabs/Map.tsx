import { useModule } from '../../contexts/ModuleContext';

export default function Map() {
  const {module} = useModule()

  return <module.Map />;
}



import { ValidationProvider} from 'vee-validate/dist/types';
type ProviderInstance = InstanceType<typeof ValidationProvider>;

interface VeeValidateObserverRef extends Vue {
  subscribe(subscriber: any, kind?: string): void;
  unsubscribe(id: string, kind?: string): void;
  validate(options?: { silent?: boolean }): Promise<boolean>;
  reset(): void;
  restoreProviderState(provider: ProviderInstance): void;
  removeProvider(id: string): void;
  setErrors(errors: Record<string, string[]>): void;
}
export { VeeValidateObserverRef };
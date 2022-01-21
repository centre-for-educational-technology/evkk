package ee.tlu.evkk.taskscheduler;

import com.spotify.futures.CompletableFutures;
import org.springframework.core.task.AsyncListenableTaskExecutor;
import org.springframework.util.concurrent.ListenableFuture;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * @author Mikk Tarvas
 * Date: 21.01.2022
 */
public class Asd {

  private final AsyncListenableTaskExecutor executor;

  public Asd(AsyncListenableTaskExecutor executor) {
    this.executor = executor;
  }

  public void asd() {
    List<CompletableFuture<?>> futures = new ArrayList<>();
    for (int i = 0; i < 10; i++) {

      ListenableFuture<?> future = executor.submitListenable(new Runnable() {
        @Override
        public void run() {

        }
      });

      futures.add(future.completable());

    }

    CompletableFutures.allAsList(futures).join();

  }

}
